# giggle-billbiubiu-holder

This is a lightweight application based on egg.js.

## Overview

This application is the Server side of [giggle-billbiubiu](https://github.com/Eriasuitor/giggle-billbiubiu), a book-keeping app. Many grammatical mistakes will be found in this document.

## Database Design

All tables and columns witch type is `JSON` include additional field as follow:

column/field name | type | description | note
:-|:-|:-|:-
createdBy | VARCHAR(32) | create user
createdAt | DATE | create date
lastEditedBy | VARCHAR(32) | last edit user
lastEditedAt | DATE | last edit date

### Table `book`

column name | type | description | note
:-|:-|:-|:-
id | INTEGER | book id | primary key, auto increment
name | VARCHAR(64) | book name
wallet | JSON | all wallets
bill | JSON | bill record
transfer | JSON | transfer record
income | JSON | income record

#### Column `wallet`

An array of json as follow included in this column.

field name | type | description
:-|:-|:-
id | integer | uniq id
name | VARCHAR(64) | wallet name
balance | integer | wallet balance
color | varchar(16) | the color of this wallet, used in app
status | ENUM(0, 1, 2) | 0-synchronize, 1-modified, 2-deleted
remark | VARCHAR(255) | wallet remark

#### Column `bill`

An array of json as follow included in this column.

field name | type | description
:-|:-|:-
id | integer | uniq id
walletId | VARCHAR(64) | wallet id
amount | INTEGER | the amount to be costed
date | Date | the date when consume
remark | VARCHAR(255) | remark
status | ENUM(0, 1, 2) | 0-synchronize, 1-modified, 2-deleted

#### Column `transfer`

An array of json as follow included in this column.

field name | type | description
:-|:-|:-
id | integer | uniq id
fromWalletId | VARCHAR(64) | wallet Id to consume
toWalletId | VARCHAR(64) | wallet Id to add
amount | INTEGER | the amount to be transfer
date | Date | the date when transfer
remark | VARCHAR(255) | remark
status | ENUM(0, 1, 2) | 0-synchronize, 1-modified, 2-deleted

#### Column `income`

An array of json as follow included in this column.

field name | type | description
:-|:-|:-
id | integer | uniq id
walletId | VARCHAR(64) | wallet Id to add
amount | INTEGER | the amount to add
date | Date | the date when add
remark | VARCHAR(255) | remark
status | ENUM(0, 1, 2) | 0-synchronize, 1-modified, 2-deleted

## Synchronize Rule

`Wallet`, `bill`, `transfer`, `income` is covered when synchronize a book. 

All bill, transfer and income records and wallets have their own field called status shown as above. records with status 0 will be ignored because it may be modified by collaborator after last synchronization, 1 will used to override the record existed in database after add id if not existed, 2 will be removed from databases.

It's worth noting that the field amount of all wallets will be updated after real-time calculation during traversing the records above contrasting with latest records in database. 

## Lock Mechanism

Lock mechanism is required because the update value is dependent on the query value when synchronize records. That is only one person is allowed to synchronize a specific book at the same time.

This application use [async-lock](https://www.npmjs.com/package/async-lock) to lock code block with `bookId`. Because the lock key is related to `bookId`, there are only little effect on efficiency. 
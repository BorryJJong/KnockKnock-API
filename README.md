## Description

KnockKnock-API

## Dependency Installation

```bash
yarn install
```

## Running the Server

```bash
# watch mode
$ yarn start:dev
```

## Running the Swagger

```bash
# swagger path
localhost:3000/api-docs
```

## Database Synchronize

```bash
# orm.ts에 Synchronize 옵션이 true일 경우
1. 데이터베이스 knockknock 생성 
2. run server
3. 데이터베이스 refresh
```

## Project Directory

```bash
# 도메인을 기준으로 MVC 생성
-- users
    |
    -- controller
    -- service
    -- repository
    -- entity
    -- module
    -- dto
```

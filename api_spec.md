# 営業日報システム API仕様書

## 1. 概要

### ベースURL
```
http://localhost:8080/api
```

### 認証方式
- セッションベース認証
- ログイン後、セッションCookieを使用して認証状態を維持

### 共通レスポンス形式

#### 成功時
```json
{
  "success": true,
  "data": { ... }
}
```

#### エラー時
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "エラーメッセージ"
  }
}
```

### 共通HTTPステータスコード
| コード | 説明 |
|--------|------|
| 200 | 成功 |
| 201 | 作成成功 |
| 400 | リクエストエラー（バリデーションエラー等） |
| 401 | 認証エラー |
| 404 | リソースが見つからない |
| 500 | サーバーエラー |

---

## 2. 認証API

### 2.1 ログイン

#### エンドポイント
```
POST /auth/login
```

#### リクエスト
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| email | string | ○ | メールアドレス |
| password | string | ○ | パスワード |

#### レスポンス（成功時）
```json
{
  "success": true,
  "data": {
    "user": {
      "sales_person_id": 1,
      "name": "山田太郎",
      "email": "user@example.com",
      "department": "営業部"
    }
  }
}
```

#### エラーコード
| コード | 説明 |
|--------|------|
| INVALID_CREDENTIALS | メールアドレスまたはパスワードが正しくない |

---

### 2.2 ログアウト

#### エンドポイント
```
POST /auth/logout
```

#### リクエスト
なし

#### レスポンス（成功時）
```json
{
  "success": true,
  "data": null
}
```

---

### 2.3 ログイン状態確認

#### エンドポイント
```
GET /auth/me
```

#### リクエスト
なし

#### レスポンス（成功時）
```json
{
  "success": true,
  "data": {
    "user": {
      "sales_person_id": 1,
      "name": "山田太郎",
      "email": "user@example.com",
      "department": "営業部"
    }
  }
}
```

#### エラーコード
| コード | 説明 |
|--------|------|
| UNAUTHORIZED | 未認証 |

---

## 3. 日報API

### 3.1 日報一覧取得

#### エンドポイント
```
GET /reports
```

#### リクエストパラメータ
なし（ログインユーザーの日報のみ取得）

#### レスポンス（成功時）
```json
{
  "success": true,
  "data": {
    "reports": [
      {
        "report_id": 1,
        "report_date": "2026-01-12",
        "visit_count": 3,
        "created_at": "2026-01-12T09:00:00Z",
        "updated_at": "2026-01-12T18:30:00Z"
      },
      {
        "report_id": 2,
        "report_date": "2026-01-11",
        "visit_count": 2,
        "created_at": "2026-01-11T09:00:00Z",
        "updated_at": "2026-01-11T17:45:00Z"
      }
    ]
  }
}
```

#### レスポンスフィールド
| フィールド | 型 | 説明 |
|-----------|-----|------|
| report_id | integer | 日報ID |
| report_date | date | 日報日付（YYYY-MM-DD） |
| visit_count | integer | 訪問記録数 |
| created_at | datetime | 作成日時（ISO 8601形式） |
| updated_at | datetime | 更新日時（ISO 8601形式） |

---

### 3.2 日報詳細取得

#### エンドポイント
```
GET /reports/:report_id
```

#### パスパラメータ
| パラメータ | 型 | 説明 |
|-----------|-----|------|
| report_id | integer | 日報ID |

#### レスポンス（成功時）
```json
{
  "success": true,
  "data": {
    "report": {
      "report_id": 1,
      "sales_person_id": 1,
      "report_date": "2026-01-12",
      "problem": "新規顧客の開拓が思うように進んでいない",
      "plan": "既存顧客へのフォローアップを優先する",
      "created_at": "2026-01-12T09:00:00Z",
      "updated_at": "2026-01-12T18:30:00Z",
      "visits": [
        {
          "visit_id": 1,
          "customer_name": "株式会社ABC",
          "visit_time": "10:00:00",
          "visit_content": "新商品の提案を行った。好感触だが、価格面で検討が必要とのこと。",
          "created_at": "2026-01-12T09:00:00Z"
        },
        {
          "visit_id": 2,
          "customer_name": "XYZ商事",
          "visit_time": "14:00:00",
          "visit_content": "既存契約の更新について打ち合わせ。次回までに見積もりを提出する約束。",
          "created_at": "2026-01-12T09:00:00Z"
        }
      ]
    }
  }
}
```

#### レスポンスフィールド（report）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| report_id | integer | 日報ID |
| sales_person_id | integer | 営業担当者ID |
| report_date | date | 日報日付（YYYY-MM-DD） |
| problem | string \| null | 課題・相談事項 |
| plan | string \| null | 明日の計画 |
| created_at | datetime | 作成日時（ISO 8601形式） |
| updated_at | datetime | 更新日時（ISO 8601形式） |
| visits | array | 訪問記録の配列 |

#### レスポンスフィールド（visits）
| フィールド | 型 | 説明 |
|-----------|-----|------|
| visit_id | integer | 訪問ID |
| customer_name | string | 顧客名 |
| visit_time | time | 訪問時刻（HH:MM:SS） |
| visit_content | string | 訪問内容 |
| created_at | datetime | 作成日時（ISO 8601形式） |

#### エラーコード
| コード | 説明 |
|--------|------|
| NOT_FOUND | 指定された日報が見つからない |
| FORBIDDEN | 他のユーザーの日報にアクセスしようとした |

---

### 3.3 日報作成

#### エンドポイント
```
POST /reports
```

#### リクエスト
```json
{
  "report_date": "2026-01-12",
  "problem": "新規顧客の開拓が思うように進んでいない",
  "plan": "既存顧客へのフォローアップを優先する",
  "visits": [
    {
      "customer_name": "株式会社ABC",
      "visit_time": "10:00",
      "visit_content": "新商品の提案を行った。好感触だが、価格面で検討が必要とのこと。"
    },
    {
      "customer_name": "XYZ商事",
      "visit_time": "14:00",
      "visit_content": "既存契約の更新について打ち合わせ。次回までに見積もりを提出する約束。"
    }
  ]
}
```

#### リクエストフィールド
| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| report_date | date | ○ | 日報日付（YYYY-MM-DD） |
| problem | string | - | 課題・相談事項 |
| plan | string | - | 明日の計画 |
| visits | array | ○ | 訪問記録の配列（最低1件必須） |
| visits[].customer_name | string | ○ | 顧客名 |
| visits[].visit_time | time | ○ | 訪問時刻（HH:MM形式） |
| visits[].visit_content | string | ○ | 訪問内容 |

#### レスポンス（成功時）
```json
{
  "success": true,
  "data": {
    "report": {
      "report_id": 1,
      "sales_person_id": 1,
      "report_date": "2026-01-12",
      "problem": "新規顧客の開拓が思うように進んでいない",
      "plan": "既存顧客へのフォローアップを優先する",
      "created_at": "2026-01-12T09:00:00Z",
      "updated_at": "2026-01-12T09:00:00Z",
      "visits": [
        {
          "visit_id": 1,
          "customer_name": "株式会社ABC",
          "visit_time": "10:00:00",
          "visit_content": "新商品の提案を行った。好感触だが、価格面で検討が必要とのこと。",
          "created_at": "2026-01-12T09:00:00Z"
        },
        {
          "visit_id": 2,
          "customer_name": "XYZ商事",
          "visit_time": "14:00:00",
          "visit_content": "既存契約の更新について打ち合わせ。次回までに見積もりを提出する約束。",
          "created_at": "2026-01-12T09:00:00Z"
        }
      ]
    }
  }
}
```

#### エラーコード
| コード | 説明 |
|--------|------|
| VALIDATION_ERROR | バリデーションエラー（訪問記録が0件、必須項目未入力等） |
| DUPLICATE_DATE | 同じ日付の日報が既に存在する |

---

### 3.4 日報更新

#### エンドポイント
```
PUT /reports/:report_id
```

#### パスパラメータ
| パラメータ | 型 | 説明 |
|-----------|-----|------|
| report_id | integer | 日報ID |

#### リクエスト
```json
{
  "report_date": "2026-01-12",
  "problem": "新規顧客の開拓が思うように進んでいない（更新）",
  "plan": "既存顧客へのフォローアップを優先する（更新）",
  "visits": [
    {
      "visit_id": 1,
      "customer_name": "株式会社ABC",
      "visit_time": "10:00",
      "visit_content": "新商品の提案を行った。好感触だが、価格面で検討が必要とのこと。"
    },
    {
      "customer_name": "DEF株式会社",
      "visit_time": "16:00",
      "visit_content": "新規訪問。担当者不在のため、後日再訪問予定。"
    }
  ]
}
```

#### リクエストフィールド
| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| report_date | date | ○ | 日報日付（YYYY-MM-DD） |
| problem | string | - | 課題・相談事項 |
| plan | string | - | 明日の計画 |
| visits | array | ○ | 訪問記録の配列（最低1件必須） |
| visits[].visit_id | integer | - | 訪問ID（既存レコードの場合のみ指定） |
| visits[].customer_name | string | ○ | 顧客名 |
| visits[].visit_time | time | ○ | 訪問時刻（HH:MM形式） |
| visits[].visit_content | string | ○ | 訪問内容 |

#### 更新ロジック
- `visit_id`が指定されている訪問記録は更新
- `visit_id`が指定されていない訪問記録は新規作成
- リクエストに含まれない既存の訪問記録は削除

#### レスポンス（成功時）
```json
{
  "success": true,
  "data": {
    "report": {
      "report_id": 1,
      "sales_person_id": 1,
      "report_date": "2026-01-12",
      "problem": "新規顧客の開拓が思うように進んでいない（更新）",
      "plan": "既存顧客へのフォローアップを優先する（更新）",
      "created_at": "2026-01-12T09:00:00Z",
      "updated_at": "2026-01-12T19:00:00Z",
      "visits": [
        {
          "visit_id": 1,
          "customer_name": "株式会社ABC",
          "visit_time": "10:00:00",
          "visit_content": "新商品の提案を行った。好感触だが、価格面で検討が必要とのこと。",
          "created_at": "2026-01-12T09:00:00Z"
        },
        {
          "visit_id": 3,
          "customer_name": "DEF株式会社",
          "visit_time": "16:00:00",
          "visit_content": "新規訪問。担当者不在のため、後日再訪問予定。",
          "created_at": "2026-01-12T19:00:00Z"
        }
      ]
    }
  }
}
```

#### エラーコード
| コード | 説明 |
|--------|------|
| NOT_FOUND | 指定された日報が見つからない |
| FORBIDDEN | 他のユーザーの日報を更新しようとした |
| VALIDATION_ERROR | バリデーションエラー（訪問記録が0件、必須項目未入力等） |

---

### 3.5 日報削除

#### エンドポイント
```
DELETE /reports/:report_id
```

#### パスパラメータ
| パラメータ | 型 | 説明 |
|-----------|-----|------|
| report_id | integer | 日報ID |

#### リクエスト
なし

#### レスポンス（成功時）
```json
{
  "success": true,
  "data": null
}
```

#### エラーコード
| コード | 説明 |
|--------|------|
| NOT_FOUND | 指定された日報が見つからない |
| FORBIDDEN | 他のユーザーの日報を削除しようとした |

---

## 4. エラーレスポンス例

### バリデーションエラー
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "入力内容に誤りがあります",
    "details": [
      {
        "field": "visits",
        "message": "訪問記録は最低1件必須です"
      },
      {
        "field": "visits[0].customer_name",
        "message": "顧客名は必須です"
      }
    ]
  }
}
```

### 認証エラー
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "認証が必要です"
  }
}
```

### リソースが見つからない
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "指定された日報が見つかりません"
  }
}
```

---

## 5. 補足事項

### 日付・時刻の形式
- 日付: `YYYY-MM-DD`形式（例: 2026-01-12）
- 時刻: `HH:MM`形式（リクエスト時）、`HH:MM:SS`形式（レスポンス時）
- 日時: ISO 8601形式（例: 2026-01-12T09:00:00Z）

### 文字コード
- UTF-8

### Content-Type
- リクエスト: `application/json`
- レスポンス: `application/json`

### セキュリティ
- CSRF対策: セッションベース認証でCSRFトークンを使用
- XSS対策: レスポンスデータのエスケープ処理
- SQLインジェクション対策: プリペアドステートメントの使用

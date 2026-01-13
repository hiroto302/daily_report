# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

**営業日報システム** - 営業担当者が日々の顧客訪問を記録し、課題を共有し、計画を上長と共有するためのWebベースの業務アプリケーションです。

**現在の状態**: 設計・仕様フェーズ - 実装コードはまだ存在しません。開発準備が整った完全な仕様ドキュメントが含まれています。

**言語**: すべてのドキュメントは日本語です。コードとコメントは日本のビジネス慣習に従う必要があります。

## システムアーキテクチャ

# 使用技術

**言語:** TypeScript
**フレームワーク** Next.js(App Router)
**UIコンポーネント** shadcn/ui + Tailwind CSS
**APIスキーマ定義** OpenAPI(Zodによる検証)
**DBスキーマ定義** Prisma.js
**テスト** Vitest
**デプロイ** Google Cloud Run

### データベーススキーマ（5つのエンティティ）

[ER.md](ER.md) で定義:

1. **SALES_PERSON** - 営業担当者マスター
2. **CUSTOMER** - 顧客マスター
3. **DAILY_REPORT** - 日報（日付、課題・相談事項、明日の計画を含む）
4. **VISIT_RECORD** - 訪問記録（日報と1対多の関係）
5. **MANAGER_COMMENT** - 上長コメント

主なリレーション:

- SALES_PERSON → DAILY_REPORT（1:多）
- DAILY_REPORT → VISIT_RECORD（1:多）
- CUSTOMER → VISIT_RECORD（1:多）
- DAILY_REPORT → MANAGER_COMMENT（1:多）

### APIエンドポイント

ベースURL: `http://localhost:3000/api`

**認証**（セッションベース）:

- `POST /auth/login` - ログイン
- `POST /auth/logout` - ログアウト
- `GET /auth/me` - 現在のユーザー情報取得

**日報**:

- `GET /reports` - 日報一覧取得（クエリパラメーター: `start_date`, `end_date`, `sales_person_id`）
- `POST /reports` - 日報新規作成
- `GET /reports/:report_id` - 日報詳細取得
- `PUT /reports/:report_id` - 日報更新
- `DELETE /reports/:report_id` - 日報削除

詳細なリクエスト/レスポンススキーマは [api_spec.md](api_spec.md) を参照してください。

### UI画面

[screen_design.md](screen_design.md) で定義:

1. **SC-01**: ログイン画面
2. **SC-02**: 日報一覧画面
3. **SC-03**: 日報登録・編集画面

画面遷移: ログイン → 日報一覧 → 登録・編集 → 日報一覧

### セキュリティ要件

- **CSRF対策**: Next.jsのCSRF保護機能を使用
- **XSS対策**: Reactの自動エスケープ + DOMPurifyによるサニタイズ
- **SQLインジェクション対策**: Prismaによるパラメーター化クエリ
- **セッション管理**: セキュアCookieとタイムアウト設定（NextAuth.js推奨）

### テスト

テスト仕様: [test_spec.md](test_spec.md)

- 22個のテストケース（TC-01 〜 TC-22）
- 機能、セキュリティ、ユーザビリティテストをカバー
- テスト環境: Chrome、Safari（最新版）
- デバイス: PC、スマートフォン
- テストフレームワーク: Vitest（単体テスト）、Playwright（E2Eテスト推奨）

## 開発ガイドライン

### API実装（Next.js App Router）

1. **API Routesの実装** - `app/api/`配下にRoute Handlersを作成
2. **Prismaスキーマの定義** - [ER.md](ER.md)の定義をPrismaスキーマに変換
3. **Zodによる入力検証** - [api_spec.md](api_spec.md)のバリデーションルールをZodスキーマで実装
4. **認証ミドルウェア** - NextAuth.jsまたはセッション管理ライブラリを使用
5. **エラーハンドリング** - `success: false` とエラーコードを含む標準化されたレスポンスを返す
6. **TypeScript型安全性** - PrismaのGeneratedクライアントとZodスキーマで型を統一

### フロントエンド実装（React + Next.js）

1. **App Routerの活用** - Server ComponentsとClient Componentsを適切に使い分け
2. **shadcn/uiコンポーネント** - [screen_design.md](screen_design.md)の画面定義をshadcn/uiで実装
3. **Tailwind CSSでスタイリング** - レスポンシブデザイン（PC/スマートフォン対応）
4. **React Hook Formでフォーム管理** - Zodスキーマと連携して入力検証
5. **TanStack QueryでAPI通信** - データフェッチングとキャッシュ管理
6. **認証状態管理** - NextAuth.jsのセッション管理を使用

### データモデルの注意点

- **Prismaスキーマ**: [ER.md](ER.md)の5つのエンティティをPrismaモデルとして定義
- **日報の構造**: 各日報には日付、複数の訪問記録、課題・相談事項、明日の計画フィールド、オプションで上長コメントが含まれます
- **訪問記録**: 各訪問には顧客、訪問時刻、訪問内容の説明が含まれます（日報ごとに最低1件必須）
- **上長コメント**: `is_manager=true` のユーザーのみがコメントを作成できます
- **日付の取り扱い**: `report_date` は日付のみ、`visit_time` は時刻のみ、タイムスタンプは `created_at`/`updated_at` を使用
- **リレーション**: Prismaの`@relation`ディレクティブで1対多の関係を定義

## ファイル構造

```
daily_report/
├── ER.md              - データベーススキーマ（Mermaid ER図）
├── api_spec.md        - REST API仕様書
├── screen_design.md   - UI/UX画面定義書
└── test_spec.md       - テストケースと品質基準
```

## 実装の次のステップ

開発開始時:

1. **プロジェクトセットアップ**:
   - Next.jsプロジェクトを作成（`npx create-next-app@latest --typescript`）
   - Prismaをセットアップ（`npx prisma init`）
   - [ER.md](ER.md)からPrismaスキーマを作成
   - shadcn/uiをインストール（`npx shadcn-ui@latest init`）
   - 必要な依存関係をインストール（NextAuth.js、Zod、React Hook Form、TanStack Query等）

2. **データベースとAPI実装**:
   - Prismaマイグレーションを実行（`npx prisma migrate dev`）
   - 認証APIを実装（`app/api/auth/[...nextauth]/route.ts`）
   - 日報CRUD APIを実装（`app/api/reports/route.ts`、`app/api/reports/[id]/route.ts`）
   - OpenAPI仕様をZodスキーマで定義

3. **画面実装**:
   - ログイン画面（SC-01）: `app/(auth)/login/page.tsx`
   - 日報一覧画面（SC-02）: `app/(dashboard)/reports/page.tsx`
   - 日報登録・編集画面（SC-03）: `app/(dashboard)/reports/new/page.tsx`、`app/(dashboard)/reports/[id]/edit/page.tsx`
   - shadcn/uiコンポーネントでUIを構築

4. **テスト**:
   - Vitestで単体テストを作成
   - Playwrightで[test_spec.md](test_spec.md)の22テストケースを実装
   - Chrome、Safariでテスト実行

5. **デプロイ準備**:
   - Google Cloud Runへのデプロイ設定
   - Dockerfileを作成
   - 環境変数の設定（DATABASE_URL、NEXTAUTH_SECRET等）

## 重要な注意事項

- **仕様書の参照**: すべての仕様は完全で詳細です。設計上の決定を行う前に必ず参照してください
- **日本語対応**: システムは日本のビジネス用語を使用。既存の仕様との一貫性を保ってください
- **型安全性**: TypeScript + Prisma + Zodで型を統一し、ランタイムエラーを防止
- **セッション管理**: NextAuth.jsを使用してセキュアなセッション管理を実装
- **訪問記録のUX**: 複数の訪問記録の追加/削除/並び替えをスムーズに操作できるUIを実装
- **レスポンシブ対応**: Tailwind CSSのブレークポイントを使用してPC/スマートフォン両対応
- **API仕様準拠**: [api_spec.md](api_spec.md)のリクエスト/レスポンス形式を厳守

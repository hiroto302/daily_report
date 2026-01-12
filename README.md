# 営業日報システム (Daily Report System)

営業担当者が日々の顧客訪問を記録し、課題を共有し、計画を上長と共有するためのWebアプリケーションです。

## 技術スタック

- **言語**: TypeScript
- **フレームワーク**: Next.js (App Router)
- **UIコンポーネント**: shadcn/ui + Tailwind CSS
- **APIスキーマ定義**: OpenAPI (Zodによる検証)
- **DBスキーマ定義**: Prisma.js
- **テスト**: Vitest, Playwright
- **デプロイ**: Google Cloud Run

## セットアップ

### 前提条件

- Node.js 20.x以上
- npm
- PostgreSQL (本番環境)

### インストール

```bash
# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.example .env.local
# .env.localを編集して必要な値を設定

# Prismaのセットアップ
npm run prisma:generate
npm run prisma:migrate
```

### 開発

```bash
# 開発サーバーの起動
npm run dev
# または
make dev

# ブラウザで http://localhost:3000 を開く
```

### ビルド

```bash
# プロダクションビルド
npm run build
# または
make build

# ビルドしたアプリケーションの起動
npm start
```

## 開発コマンド

### npm scripts

```bash
npm run dev              # 開発サーバー起動
npm run build            # プロダクションビルド
npm run start            # プロダクションサーバー起動
npm run lint             # ESLintチェック
npm run lint:fix         # ESLint自動修正
npm run format           # Prettier整形
npm run format:check     # Prettier整形チェック
npm run type-check       # TypeScript型チェック
npm run test             # 単体テスト
npm run test:ui          # テストUI起動
npm run test:coverage    # カバレッジ付きテスト
npm run test:e2e         # E2Eテスト
npm run test:e2e:ui      # E2EテストUI起動
npm run prisma:generate  # Prismaクライアント生成
npm run prisma:migrate   # マイグレーション実行
npm run prisma:studio    # Prisma Studio起動
```

### Makeコマンド

```bash
make help           # ヘルプ表示
make install        # 依存関係インストール
make dev            # 開発サーバー起動
make build          # ビルド
make lint           # Lintチェック
make format         # フォーマット
make test           # テスト実行
make test-e2e       # E2Eテスト実行
make ci-check       # CI環境でのチェック（lint + type-check + test）
make docker-build   # Dockerイメージビルド
make docker-run     # Dockerコンテナ起動
make gcloud-build   # Cloud Buildでイメージビルド
make deploy         # Cloud Runにデプロイ
make deploy-full    # ビルド＋デプロイ
make logs           # Cloud Runログ表示
```

## デプロイ

### Google Cloud Run

```bash
# Google Cloudに認証
make gcloud-auth

# ビルドとデプロイ
make deploy-full

# またはGitHubにpushすると自動デプロイ（mainブランチ）
git push origin main
```

### 環境変数の設定

GitHub Secretsに以下を設定してください：

- `GCP_SA_KEY`: Google Cloud Service Accountのキー（JSON）
- `DATABASE_URL`: データベース接続URL
- `NEXTAUTH_SECRET`: NextAuth.jsのシークレットキー
- `NEXTAUTH_URL`: アプリケーションのURL

## CI/CD

- **CI**: `.github/workflows/ci.yml`
  - Lint、型チェック、テストを実行
  - mainとdevelopブランチへのpush/PRで実行

- **CD**: `.github/workflows/deploy.yml`
  - mainブランチへのpushで自動デプロイ
  - Cloud Runにデプロイ

## プロジェクト構成

詳細は [CLAUDE.md](CLAUDE.md) を参照してください。

## ドキュメント

- [ER図](ER.md) - データベース設計
- [API仕様](api_spec.md) - REST API仕様
- [画面設計](screen_design.md) - UI/UX仕様
- [テスト仕様](test_spec.md) - テストケース

## ライセンス

Private

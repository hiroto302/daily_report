# Google Cloud設定
PROJECT_ID := daily-report-484116
REGION := asia-northeast1
SERVICE_NAME := daily-report
IMAGE_NAME := gcr.io/$(PROJECT_ID)/$(SERVICE_NAME)

# 環境変数
ENV ?= production

.PHONY: help
help: ## ヘルプを表示
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

.PHONY: install
install: ## 依存関係をインストール
	npm install

.PHONY: dev
dev: ## 開発サーバーを起動
	npm run dev

.PHONY: build
build: ## プロジェクトをビルド
	npm run build

.PHONY: lint
lint: ## Lintチェック
	npm run lint

.PHONY: format
format: ## コードフォーマット
	npm run format

.PHONY: test
test: ## テストを実行
	npm run test

.PHONY: test-e2e
test-e2e: ## E2Eテストを実行
	npm run test:e2e

.PHONY: type-check
type-check: ## TypeScript型チェック
	npm run type-check

.PHONY: prisma-generate
prisma-generate: ## Prismaクライアントを生成
	npm run prisma:generate

.PHONY: prisma-migrate
prisma-migrate: ## Prismaマイグレーションを実行
	npm run prisma:migrate

.PHONY: prisma-studio
prisma-studio: ## Prisma Studioを起動
	npm run prisma:studio

.PHONY: docker-build
docker-build: ## Dockerイメージをビルド
	docker build -t $(IMAGE_NAME):latest .

.PHONY: docker-run
docker-run: ## Dockerコンテナをローカルで実行
	docker run -p 3000:3000 --env-file .env.local $(IMAGE_NAME):latest

.PHONY: gcloud-auth
gcloud-auth: ## Google Cloudに認証
	gcloud auth login
	gcloud config set project $(PROJECT_ID)

.PHONY: gcloud-build
gcloud-build: ## Cloud BuildでDockerイメージをビルド
	gcloud builds submit --tag $(IMAGE_NAME):latest

.PHONY: deploy
deploy: ## Cloud Runにデプロイ
	gcloud run deploy $(SERVICE_NAME) \
		--image $(IMAGE_NAME):latest \
		--platform managed \
		--region $(REGION) \
		--allow-unauthenticated \
		--project $(PROJECT_ID) \
		--set-env-vars NODE_ENV=$(ENV)

.PHONY: deploy-full
deploy-full: gcloud-build deploy ## ビルドとデプロイを実行

.PHONY: logs
logs: ## Cloud Runのログを表示
	gcloud run services logs read $(SERVICE_NAME) \
		--region $(REGION) \
		--project $(PROJECT_ID) \
		--limit 50

.PHONY: describe
describe: ## Cloud Runサービスの詳細を表示
	gcloud run services describe $(SERVICE_NAME) \
		--region $(REGION) \
		--project $(PROJECT_ID)

.PHONY: clean
clean: ## ビルド成果物を削除
	rm -rf .next
	rm -rf node_modules
	rm -rf coverage
	rm -rf out

.PHONY: ci-check
ci-check: lint type-check test ## CIで実行されるチェック
	@echo "All checks passed!"

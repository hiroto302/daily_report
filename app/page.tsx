import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="mb-8 text-4xl font-bold">
        営業日報システム - UIコンポーネントサンプル
      </h1>

      {/* ボタンサンプル */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button>デフォルト</Button>
          <Button variant="secondary">セカンダリ</Button>
          <Button variant="outline">アウトライン</Button>
          <Button variant="ghost">ゴースト</Button>
          <Button variant="destructive">削除</Button>
          <Button variant="link">リンク</Button>
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          <Button size="sm">小サイズ</Button>
          <Button size="default">デフォルトサイズ</Button>
          <Button size="lg">大サイズ</Button>
        </div>
      </section>

      {/* カードサンプル */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Cards</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>日報カード</CardTitle>
              <CardDescription>2026-01-13</CardDescription>
            </CardHeader>
            <CardContent>
              <p>訪問件数: 3件</p>
              <p className="mt-2 text-sm text-muted-foreground">
                最終更新: 18:30
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>顧客訪問</CardTitle>
              <CardDescription>株式会社ABC</CardDescription>
            </CardHeader>
            <CardContent>
              <p>訪問時刻: 10:00</p>
              <p className="mt-2 text-sm">新商品の提案を行った</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* フォームサンプル */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Form Elements</h2>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>ログインフォーム</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input id="email" type="email" placeholder="user@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input id="password" type="password" />
            </div>
            <Button className="w-full">ログイン</Button>
          </CardContent>
        </Card>
      </section>

      {/* テーブルサンプル */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Table</h2>
        <Card>
          <CardHeader>
            <CardTitle>日報一覧</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>日報日付</TableHead>
                  <TableHead>訪問件数</TableHead>
                  <TableHead>更新日時</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">2026-01-12</TableCell>
                  <TableCell>3件</TableCell>
                  <TableCell>2026-01-12 18:30</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">
                        編集
                      </Button>
                      <Button size="sm" variant="destructive">
                        削除
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">2026-01-11</TableCell>
                  <TableCell>2件</TableCell>
                  <TableCell>2026-01-11 17:45</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">
                        編集
                      </Button>
                      <Button size="sm" variant="destructive">
                        削除
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* レスポンシブデザイン確認 */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Responsive Design Test</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>カード {i}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  レスポンシブグリッドのテスト
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}

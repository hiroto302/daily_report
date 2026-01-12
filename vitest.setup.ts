import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { expect, afterEach } from 'vitest';

// テスト終了後にクリーンアップ
afterEach(() => {
  cleanup();
});

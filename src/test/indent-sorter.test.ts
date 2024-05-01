import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { IndentSorter } from '../indent-sorter';

suite('Indent Sorter Test Suite', () => {
  const indentSorter = new IndentSorter();
  const examples_dir = path.join(__dirname, 'indent-sorter');

  fs.readdir(examples_dir, (err, files) => {
    if (err) {
      return console.error('Failed to read directory: ', err);
    }

    files.filter(file => file.includes('expected')).forEach(file => {
      const [note, _, ext] = file.split('.');
      const input = fs.readFileSync(path.join(examples_dir, `${note}.${ext}`), 'utf-8');
      const expected = fs.readFileSync(path.join(examples_dir, file), 'utf-8');

      test(`should process ${note}.${ext}`, () => {
        const result = indentSorter.perform(input);
        assert.strictEqual(result, expected);
      });
    });
  });
});

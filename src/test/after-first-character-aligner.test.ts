import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { AfterFirstCharacterAligner } from '../after-first-character-aligner';

suite('After First Character Aligner Test Suite', () => {
  const afterFirstCharacterAligner = new AfterFirstCharacterAligner();
  const examples_dir = path.join(__dirname, 'after-first-character-aligner');

  fs.readdir(examples_dir, (err, files) => {
    if (err) {
      return console.error('Failed to read directory: ', err);
    }

    files.filter(file => file.includes('expected')).forEach(file => {
      const [note, _, ext] = file.split('.');
      const input = fs.readFileSync(path.join(examples_dir, `${note}.${ext}`), 'utf-8');
      const expected = fs.readFileSync(path.join(examples_dir, file), 'utf-8');
      const target = input.split('\n')[0].slice(2).trim();

      test(`after-first-character-aligner should process ${note}.${ext}`, () => {
        const result = afterFirstCharacterAligner.perform(input, target);
        assert.strictEqual(result, expected);
      });
    });
  });
});

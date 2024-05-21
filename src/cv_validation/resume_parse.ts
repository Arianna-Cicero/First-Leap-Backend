import { spawn } from 'child_process';

function checkKeywordOccurrences(occurrences: number): boolean {
  return occurrences > 0;
}

function extractTextFromBuffer(
  buffer: Buffer,
  keyword: string,
): Promise<{ text: string; keywordFound: boolean }> {
  return new Promise((resolve, reject) => {
    const pdftotext = spawn('pdftotext', ['-', '-']);

    let extractedText = '';

    pdftotext.stdout.on('data', (data) => {
      extractedText += data.toString();
    });

    pdftotext.on('error', (err) => {
      reject(err);
    });

    pdftotext.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`pdftotext process exited with code ${code}`));
      } else {
        const regex = new RegExp(keyword, 'gi');
        const matches = extractedText.match(regex);
        resolve({
          text: extractedText,
          keywordFound: matches
            ? checkKeywordOccurrences(matches.length)
            : false,
        });
      }
    });

    pdftotext.stdin.write(buffer);
    pdftotext.stdin.end();
  });
}

export async function ResumeParse(
  buffer: Buffer,
  keyword: string,
): Promise<boolean> {
  try {
    const { text, keywordFound } = await extractTextFromBuffer(buffer, keyword);
    console.log(
      `Number of occurrences of '${keyword}':`,
      keywordFound ? 'Found' : 'Not found',
    );
    console.log('Extracted text:', text);
    return keywordFound;
  } catch (error) {
    console.error('Error extracting text:', error);
    throw error;
  }
}

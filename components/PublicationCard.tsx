import { useState } from 'react';

export default function PublicationCard({ pub }) {
  const [showBib, setShowBib] = useState(false);
  const rawFields = pub.entryTags || {};

  // Case-insensitive field reader helper
  const getField = (fieldName) => {
    const key = Object.keys(rawFields).find(
      (k) => k.toLowerCase() === fieldName.toLowerCase()
    );
    return key ? rawFields[key] : '';
  };

  const title = getField('title').replace(/[{}]/g, '');
  const author = getField('author');
  const journal = getField('journal');
  const volume = getField('volume');
  const number = getField('number');
  const pages = getField('pages');
  const year = getField('year');
  const note = getField('note');
  const doi = getField('doi');

  return (
    <div className="my-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
      <h4 className="text-lg font-semibold text-gray-900">
        {title || pub.citationKey || 'Untitled Publication'}
      </h4>

      {author && (
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
          {author}
        </p>
      )}

      <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-1">
        {journal && <span>{journal}</span>}
        {volume && `, ${volume}`}
        {number && `(${number})`}
        {pages && `: ${pages}`}
        {year && ` (${year})`}
      </p>

      {note && (
        <span className="inline-block mt-2 px-2 py-1 text-xs font-medium text-amber-800 bg-amber-100 rounded dark:bg-amber-900 dark:text-amber-200">
          {note}
        </span>
      )}

      <div className="mt-3 flex items-center space-x-3">
        {doi && (
          <a
            href={doi.startsWith('http') ? doi : `https://doi.org/${doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-teal-600 hover:underline dark:text-teal-400 font-medium"
          >
            DOI ↗
          </a>
        )}

        <button
          onClick={() => setShowBib(!showBib)}
          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-2.5 py-1 rounded dark:bg-gray-700 dark:text-gray-200"
        >
          {showBib ? 'Hide BibTeX' : 'Cite (BibTeX)'}
        </button>
      </div>

      {showBib && (
        <pre className="mt-3 p-3 bg-gray-900 text-gray-100 text-xs rounded overflow-x-auto">
          <code>{`@${pub.entryType}{${pub.citationKey},\n` +
            Object.entries(rawFields)
              .map(([k, v]) => `  ${k} = {${v}}`)
              .join(',\n') +
            '\n}'}</code>
        </pre>
      )}
    </div>
  );
}
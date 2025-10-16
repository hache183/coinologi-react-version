import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = React.lazy(() => import('react-quill'));

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'blockquote', 'code-block'],
    ['clean']
  ]
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'link', 'blockquote', 'code-block'
];

const FallbackEditor = ({ value, onChange }) => (
  <textarea
    value={value}
    onChange={(event) => onChange(event.target.value)}
    rows={12}
    style={{ width: '100%', fontFamily: 'inherit', fontSize: '1rem', padding: '1rem' }}
    placeholder="Incolla il contenuto dell'articolo"
  />
);

FallbackEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

const RichTextEditor = ({ value, onChange }) => {
  return (
    <Suspense fallback={<FallbackEditor value={value} onChange={onChange} />}>
      <ReactQuill value={value} onChange={onChange} modules={modules} formats={formats} />
    </Suspense>
  );
};

RichTextEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default RichTextEditor;

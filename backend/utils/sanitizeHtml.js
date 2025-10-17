import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const sanitizeHtml = (dirty = '') => {
  return DOMPurify.sanitize(dirty, {
    USE_PROFILES: { html: true }
  });
};

export default sanitizeHtml;

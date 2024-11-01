import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import PropTypes from 'prop-types';

/**
 * Section component represents an individual section in the form.
 * It uses the useSortable hook from @dnd-kit/sortable to enable drag-and-drop functionality.
 * 
 * @param {Object} props - The properties object.
 * @param {Object} props.section - The section data.
 * @param {number} props.index - The index of the section.
 * @param {Function} props.handleInputChange - The function to handle input changes.
 */
function Section({ section, index, handleInputChange }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners} 
      className='bg-white p-4 shadow-md border-2 border-gray-300 my-4 rounded-xl'>
      <input
        name='title'
        value={section.title}
        onChange={(e) => handleInputChange(index, e)}
        placeholder='Section title'
        className='w-full border-2 border-gray-200 p-2 mb-4 rounded-xl bg-white'
      />
      <select
        name='responseType'
        value={section.responseType}
        onChange={(e) => handleInputChange(index, e)}
        className='w-full p-2 mb-4 bg-white border-2 rounded-xl border-gray-200'
      >
        <option value="text">Text</option>
      </select>
    </div>
  );
}

Section.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    responseType: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default Section;
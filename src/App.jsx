import  { useState } from 'react';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import Section from './components/Section';

function App() {
  const [section, setSection] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  /**
   * Handles the end of a drag event.
   * Updates the order of sections based on the drag-and-drop result.
   * 
   * @param {Object} event - The drag event object.
   */
  const handleDragEnd = (event) => {
    const { active, over } = event;

    setSection((section) => {
      const oldIndex = section.findIndex((section) => section.id === active.id);
      const newIndex = section.findIndex((section) => section.id === over.id);

      return arrayMove(section, oldIndex, newIndex);
    });
  };

  /**
   * Adds a new section to the form.
   */
  const addSection = () => {
    setSection([...section, { title: '', responseType: 'text', id: section.length }]);
  };

  /**
   * Handles input changes for the sections.
   * 
   * @param {number} index - The index of the section being updated.
   * @param {Object} event - The input change event object.
   */
  const handleInputChange = (index, event) => {
    const updatedSections = [...section];
    updatedSections[index][event.target.name] = event.target.value;
    setSection(updatedSections);
  };

  return (
    <div className='p-20 min-h-screen'>
      <div className='bg-seventh shadow-md rounded-xl p-10 max-w-5xl mx-auto'>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <h1 className='text-4xl text-center text-sixth font-bold mb-4'>Edit your form!</h1>
          <input
            className='w-full p-2 mb-4 bg-white border-2 rounded-xl border-gray-300'
            placeholder='Form title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className='w-full p-2 mb-4 border-2 border-gray-300 rounded-xl bg-white'
            placeholder='Form description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <SortableContext items={section} strategy={verticalListSortingStrategy}>
            <div className='bg-primary w-full'></div>
            <div className='my-3 p-10 max-w-5xl mx-auto flex justify-center'>
              <button
                className='w-64 p-2 bg-fourth text-white font-bold rounded-xl hover:bg-fifth hover:text-fourth flex justify-center'
                onClick={addSection}
              >
                Add Section
              </button>
            </div>
            {section.map((section) => (
              <Section
                key={section.id}
                section={section}
                index={section.id}
                onChange = {(e) => handleInputChange(e)}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <div className='bg-seventh  shadow-md my-3 p-10 max-w-5xl rounded-xl mx-auto'>
        <h1 className='text-sixth text-3xl font-bold pb-3'>Attached PDF</h1>

        <div className="flex items-center justify-center w-full">
    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100  ">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">ONLY PDF (MAX. 8MB)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
    </label>
</div> 

        <button className='w-64 p-2 bg-fourth  text-white mx-auto block rounded-xl font-bold hover:bg-fifth hover:text-fourth my-3'>
          Save
        </button>
      </div>
    </div>
  );
}

export default App;
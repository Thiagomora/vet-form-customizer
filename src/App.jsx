import React, { useState } from 'react';
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
      <div className='bg-fourth p-2'/>
      <div className='bg-white shadow-md p-10 max-w-5xl mx-auto'>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <h1 className='text-2xl text-fifth font-bold mb-4'>Edit your form!</h1>
          <input
            className='w-full p-2 mb-4 bg-white border-2 border-gray-300'
            placeholder='Form title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className='w-full p-2 mb-4 border-2 border-gray-300 bg-white'
            placeholder='Form description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <SortableContext items={section} strategy={verticalListSortingStrategy}>
            <div className='bg-primary w-full'></div>
            <div className='bg-white my-3 p-10 max-w-5xl mx-auto flex justify-center'>
              <button
                className='w-64 p-2 bg-fourth text-white font-bold hover:bg-fifth hover:text-fourth flex justify-center'
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
                handleInputChange={handleInputChange}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <div className='bg-white shadow-md my-3 p-10 max-w-5xl mx-auto'>
        <h1 className='text-2xl text-fifth font-bold'>Attached PDF</h1>
        <input type='file' className='w-full p-2 border-2 border-gray-300' />
        <button className='w-64 p-2 bg-fourth text-white font-bold hover:bg-fifth hover:text-fourth my-3'>
          Save
        </button>
      </div>
    </div>
  );
}

export default App;
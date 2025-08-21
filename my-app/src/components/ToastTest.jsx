import React from 'react';
import { toast } from 'sonner';

function ToastTest() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Toast Test Component</h2>
      <button 
        onClick={() => {
          console.log('Toast test button clicked');
          toast.success('Success toast!');
        }}
        style={{ 
          padding: '10px 20px', 
          margin: '10px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Test Success Toast
      </button>
      
      <button 
        onClick={() => {
          console.log('Error toast test button clicked');
          toast.error('Error toast!');
        }}
        style={{ 
          padding: '10px 20px', 
          margin: '10px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Test Error Toast
      </button>
      
      <button 
        onClick={() => {
          console.log('Info toast test button clicked');
          toast.info('Info toast!');
        }}
        style={{ 
          padding: '10px 20px', 
          margin: '10px',
          backgroundColor: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Test Info Toast
      </button>
    </div>
  );
}

export default ToastTest; 
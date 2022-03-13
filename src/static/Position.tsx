import React from 'react';
import './Position.css';

const Position = (props: any) => {
    const { color, name, id } = props;

    return (
      <div className="position"
        style={{ backgroundColor: color, cursor: 'pointer', fontSize: '25px'}}
        title={name} 
       />
     );
  };
 
  export default Position;
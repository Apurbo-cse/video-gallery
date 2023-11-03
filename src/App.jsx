import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const App = () => {
  const generateLayout = () => {
    const layout = [];
    const cols = 5;
    const rows = 3;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = (y * cols) + x + 1;
        layout.push({ i: i.toString(), x, y, w: 2, h: 2, checked: false });
      }
    }

    return layout;
  };

  const [layout, setLayout] = useState(generateLayout());

  const handleCheck = (itemId) => {
    const updatedLayout = layout.map((item) =>
      item.i === itemId ? { ...item, checked: !item.checked } : item
    );
    setLayout(updatedLayout);
  };

  const handleDelete = () => {
    const updatedLayout = layout.filter((item) => !item.checked);
    setLayout(updatedLayout);
  };

  const areAnyImagesSelected = layout.some((item) => item.checked);
  
  return (
    <div className="p-5">

      <div className=" container mx-auto" style={{ width: "800px" }}>
        <div className="d-flex justify-content-between w-100">
          <div>Selected Items </div>   {areAnyImagesSelected && <button onClick={handleDelete}>Delete</button>}
        </div>

        <div className="d-flex flex-wrap border">
          <GridLayout className="layout" layout={layout} cols={5} rowHeight={50} width={800}>
            {layout.map((item) => (
              <div className="mb-2 positin-relative" key={item.i}>
                <label htmlFor={item.i}>
                  <img src={`https://via.placeholder.com/600/92c952`} className="p-2" style={{ width: "150px" }} alt="" />
                </label>
                <input
                  id={item.i}
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleCheck(item.i)}
                  style={
                    {
                      position: 'absolute',
                      top: 10,
                      left: 10
                    }
                  }
                />
              </div>
            ))}
          </GridLayout>
        </div>
      </div>
    </div>
  );
};

export default App;

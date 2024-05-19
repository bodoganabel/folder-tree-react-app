import React, { Children, useState } from 'react';
import logo from './logo.svg';
import './App.css';

type IFile = {
  name: string,
  children?: IFile[]
}

const files: IFile[] = [
  {
    name: "root",
    children: [{
      name: "node_modules",
      children: [{
        name: "joi",
        children: [{
          name: "node_modules",
          children: [{
            name: "joi",
          },
          { name: "Hello" }
          ]
        },
        ]
      },
      {
        name: "package.json"
      },
      {
        name: "vite.config.ts"
      }
      ]
    }
    ]
  }]


function Entry({ file, depth }: { file: IFile, depth: number }) {

  const [isExpanded, setIsExpanded] = useState(false)

  return <div className='' style={{ textAlign: "left", cursor: 'pointer' }}>
    <div onClick={() => { setIsExpanded(!isExpanded) }}>
      {file.children && (isExpanded ? "-":"+")}{file.name}
    </div>
    {isExpanded && <div style={{ paddingLeft: `1rem` }}>
        {file.children !== undefined && file.children.map((child) => (
          <div style={{}}>
            <Entry file={child} depth={depth + 1} />
          </div>
        ))}
      </div>}
  </div>

}

function App() {
  return (
    <div className="App" style={{ display: "flex", justifyContent: "start" }}>
      {files.map(file => <Entry file={file} depth={0}></Entry>)}
    </div>
  );
}

export default App;

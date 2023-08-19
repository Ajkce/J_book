import ReactDOM from "react-dom";
import { useEffect, useState, useRef } from "react";
import * as esbuild from "esbuild-wasm";


const App = () => {
  const [value, setValue] = useState("");
  const [code, setCode] = useState("");
  const ref = useRef<any>();

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
    
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = () => {
    console.log(value);
  };
  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
      <div>
        <button onClick={async() => {
            if(!ref.current){
                return;
            }
            const result = await ref.current.transform(value, {
                loader: 'jsx',
                target: 'es2015'
            });
            console.log(result.code)
           

        }}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

ReactDOM.render(<App></App>, document.querySelector("#root"));

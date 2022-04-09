import React,{useEffect, useState} from "react";

const Counter = () => {
  const [second, setSecond] = useState(0)

  useEffect(() => {
   second >= 0 && setTimeout(() => {
    setSecond(second + 1)
   }, 1000);

  }, [second]);

  return (
    <div>
      {second}
    </div>
  )
}

export default Counter

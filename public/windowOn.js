import React, {useLayoutEffect, useState} from 'react';
alert('bruh');
function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}
window.onresize.addEventListener(ShowWindowDimensions);
function ShowWindowDimensions(props) {
  const [width, height] = useWindowSize();
  console.log('w:' + width + ' h:' + height);
}

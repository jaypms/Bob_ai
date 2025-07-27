import { useEffect } from 'react';

// Dans ton composant App
useEffect(() => {
  const testFetch = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const data = await res.json();
      console.log('Test fetch success:', data);
    } catch (e) {
      console.error('Test fetch failed:', e);
    }
  };
  testFetch();
}, []);
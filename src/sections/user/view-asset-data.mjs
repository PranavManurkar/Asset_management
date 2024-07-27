// useAssets.js
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { firebaseConfig } from './asset-data.mjs';
import { initializeApp } from 'firebase/app';

initializeApp(firebaseConfig);

const db = getDatabase();

export function useAssets() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const assetsRef = ref(db, 'assets');
    const unsubscribe = onValue(assetsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const assetArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setAssets(assetArray);
      } else {
        setAssets([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return assets;
}

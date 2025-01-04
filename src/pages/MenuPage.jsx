import { useEffect } from 'react';
import { useMenu } from '../context/MenuContext';
import { fetchMenu } from '../services/api';

const MenuPage = () => {
  const { menu, setMenu } = useMenu();

  useEffect(() => {
    const getMenu = async () => {
      try {
        const data = await fetchMenu(2); // ID del restaurante
        setMenu(data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };
    getMenu();
  }, [setMenu]);

  if (!menu) return <p>Loading...</p>;

  return (
    <div>
      <h1>Menú</h1>
      {menu.categories.map((category) => (
        <div key={category.posCategoryId}>
          <h2>{category.name}</h2>
          {category.items.map((item) => (
            <div key={item.posId}>
              <h3>{item.name} - ${item.price.toFixed(2)}</h3>
              <p>{item.description || 'Sin descripción'}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MenuPage;

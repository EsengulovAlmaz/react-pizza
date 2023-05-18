import React from 'react';

export const customContext = React.createContext();

export const Context = ({ children }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [items, setItems] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [selected, setSelected] = React.useState('популярности');
  const [open, setOpen] = React.useState(false);

  const onClickListItem = (name) => {
    setSelected(name);
    setOpen(false);
  };

  React.useEffect(() => {
    const categories = activeIndex === 0 ? "" : `category=${activeIndex}`;
    const sort = selected === "популярности"
      ? "rating"
      : selected === "цене"
        ? "price"
        : selected === "алфавиту"
          ? "title"
          : "";

    setIsLoading(true);
    fetch(`http://localhost:8080/pizza?${categories}&_sort=${sort}&_order=asc`)
      .then(res => res.json())
      .then(res => {
        setItems(res);
        setIsLoading(false);
      })
    window.scrollTo(0, 0);
  }, [activeIndex, selected]);

  const value = {
    activeIndex,
    setActiveIndex,
    items,
    isLoading,
    selected,
    setSelected,
    open,
    setOpen,
    onClickListItem
  };

  return (
    <customContext.Provider value={value}>
      {children}
    </customContext.Provider>
  )
}
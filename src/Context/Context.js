import React from 'react';

export const customContext = React.createContext();

export const Context = ({ children }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [items, setItems] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [selected, setSelected] = React.useState("rating");
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const onClickListItem = (name) => {
    setSelected(name);
    setOpen(false);
  };

  React.useEffect(() => {
    const categories = activeIndex === 0 ? "" : `category=${activeIndex}`;
    const search = searchValue === "" ? "" : `title_like=${searchValue}`;

    setIsLoading(true);
    fetch(`http://localhost:8080/pizza?${categories}&_sort=${selected}&_order=asc&${search}`)
      .then(res => res.json())
      .then(res => {
        setItems(res);
        setIsLoading(false);
      })
    window.scrollTo(0, 0);
  }, [activeIndex, selected, searchValue]);

  const value = {
    activeIndex,
    setActiveIndex,
    items,
    isLoading,
    selected,
    setSelected,
    open,
    setOpen,
    onClickListItem,
    searchValue,
    setSearchValue
  };

  return (
    <customContext.Provider value={value}>
      {children}
    </customContext.Provider>
  )
}
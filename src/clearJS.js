(async function () {
  const getData = async () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res([
          {
            id: 1,
            title: "todo-1",
          },
          {
            id: 2,
            title: "todo-2",
          },
          {
            id: 3,
            title: "todo-3",
          },
        ]);
      }, 1000);
    });
  };

  console.log("1 test");
  console.log(await getData());
  console.log("2 test");
})();

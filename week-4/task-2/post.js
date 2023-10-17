// 221111452 - Raymond Tju

export default class Post {
  constructor() {}

  async getPost(id) {
    try {
      const get = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      if (!get.ok) throw new Error("Failed to fetch");

      const res = await get.json();

      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async getBatchPost(total) {
    try {
      const data = await Promise.all(
        Array.from({ length: total }).map(async (_, i) => {
          const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${i + 1}`
          );
          if (!res.ok) throw new Error("Failed to fetch");

          return res.json();
        })
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

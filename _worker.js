export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let path = url.pathname;

    // 根路径 → index.html
    if (path === "/" || path === "") {
      return env.ASSETS.fetch(new Request("/index.html", request));
    }
    // 目录路径（以 / 结尾）→ 补 index.html
    if (path.endsWith("/")) {
      return env.ASSETS.fetch(new Request(path + "index.html", request));
    }
    // 尝试直接获取文件
    try {
      const res = await env.ASSETS.fetch(new Request(path, request));
      if (res.ok) return res;
    } catch (_) {}
    return new Response("Not Found", { status: 404 });
  },
};

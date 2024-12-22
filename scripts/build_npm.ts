import configuration from "../deno.json" with { type: "json" };

import { build, emptyDir } from "@deno/dnt";

const outDir: string = "./dist";

await emptyDir(outDir);

await build({
  entryPoints: [configuration.exports],
  outDir: outDir,
  shims: {
    deno: true,
  },
  test: false,
  package: {
    name: configuration.name.replace("@", "").replace("/", "-"),
    version: configuration.version,
    description: configuration.description,
    author: configuration.author,
    license: configuration.license,
    repository: configuration.repository,
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", `${outDir}/LICENSE`);
    Deno.copyFileSync("README.md", `${outDir}/README.md`);
  },
});

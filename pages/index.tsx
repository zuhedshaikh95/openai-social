import Head from "next/head";
import { Card, EmptyState, Header, Loader, Masthead } from "@/components";
import { getPosts } from "@/redux/features/postSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "@/hooks";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, postsLoading } = useSelector((store: RootState) => store.postReducer);
  const [searchText, setSearchText] = useState<string>("");
  const debouncedText = useDebounce(searchText);

  useEffect(() => {
    dispatch(getPosts(debouncedText));
  }, [debouncedText]);

  return (
    <>
      <Head>
        <title>DALL.E</title>
      </Head>

      <Header />

      <main className="px-4 py-8 sm:p-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <section className="w-full max-w-7xl mx-auto">
          <Masthead />

          <div className="mt-16">
            <input
              className="w-full p-3 bg-gray-50 border er-gray-300 rounded-lg outline-none focus:border-[#4649ff]"
              type="search"
              placeholder="Found what you're looking for? Try here!"
              onChange={(event) => setSearchText(event.target.value)}
            />
          </div>

          <div className="mt-10">
            {postsLoading ? (
              <div className="flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <>
                {searchText && (
                  <h2 className="font-medium text-[#666e75] text-lg mb-3">
                    Showing results for:{" "}
                    <span className="text-[#222328]">{searchText}</span>
                  </h2>
                )}

                {posts.length ? (
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {posts.map((post: any) => (
                      <Card key={post._id} {...post} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="No results found"
                    subtitle="Try searching for something else"
                  />
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

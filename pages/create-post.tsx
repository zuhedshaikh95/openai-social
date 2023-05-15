import Head from "next/head";
import { useRouter } from "next/router";
import { Header, Input, Loader } from "@/components";
import { randomSurprisePrompt } from "@/utils";
import { preview } from "@/public/assets";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { generatePhoto } from "@/redux/features/generatorSlice";
import { createPost } from "@/redux/features/postSlice";

const create = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { photo, generatorLoading } = useSelector((store: RootState) => store.generatorReducer);
  const { postsLoading } = useSelector((store: RootState) => store.postReducer);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      prompt: "",
      photo: "",
    },
  });

  const onSubimt: SubmitHandler<FieldValues> = (data) => {
    dispatch(generatePhoto(data));
  };
  
  const handleSurpriseMe = () => {
    const randomPrompt = randomSurprisePrompt(watch("prompt"));
    setValue("prompt", randomPrompt);
  };
  
  const handleShare = () => {
    if(!photo) return;

    setValue('photo', photo);
    const form = getValues();
    dispatch(createPost(form));
  }

  return (
    <>
      <Head>
        <title>Create post</title>
      </Head>

      <Header />
      <div className="px-4 py-8 sm:p-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <section className="w-full max-w-7xl mx-auto">
          <div>
            <h1 className="font-extrabold text-[#222328] text-3xl">Create</h1>
            <p className="mt-2 text-[#666e75] text-base max-w-lg">
              Create imaginative and visually stunning images generated by
              DALL-E AI and share then with the community.
            </p>
          </div>

          <form
            className="mt-16 max-w-3xl space-y-5"
            onSubmit={handleSubmit(onSubimt)}
          >
            <Input
              id="name"
              label="Name"
              type="text"
              disabled={generatorLoading}
              register={register}
              placeholder="John Doe"
              errors={errors}
              required
            />

            <Input
              id="prompt"
              label="Prompt"
              type="text"
              disabled={generatorLoading}
              register={register}
              placeholder="A plush toy robot sitting against a yellow wall"
              errors={errors}
              required
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />

            <div className={`relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:boredr-blue-500 w-80 p-3 h-80 flex justify-center items-center`}>
              {photo ? (
                <img
                  src={photo}
                  alt='prompt-photo'
                  className={`object-contain ${generatorLoading ? 'opacity-40' : 'opacity-100'}`}
                />
              ) : (
                <img
                  src={preview.src}
                  alt="preview"
                  className="w-2/5 h-2/5 object-contain opacity-40"
                />
              )}

              {generatorLoading && (
                <div className="absolute inset-0 z-0 flex justify-center items-center opacity-50 rounded-lg">
                  <Loader />
                </div>
              )}
            </div>

            <div className="mt-5 flex gap-5">
              <button
                className={`text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:cursor-not-allowed ${generatorLoading ? 'opacity-40' : 'opacity-100'}`}
                type="button"
                disabled={generatorLoading}
                onClick={handleSubmit(onSubimt)}
              >
                {generatorLoading ? "Generating..." : "Generate"}
              </button>
            </div>

            <div className="mt-10">
              <p className="mt-2 text-[#666e75] text-sm">
                Once you have created the image you want, you can share it with
                others in the community
                <button
                  className="block mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  type="button"
                  onClick={handleShare}
                >
                  {postsLoading ? 'Sharing...' : 'Share with the community'}
                </button>
              </p>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default create;

import SearchForm from "../SearchForm";

export default function Home() {
return(<article className="relative text-center pt-20 flex flex-col gap-24 md:gap-36">
<div className="flex flex-col gap-2">
<h3 className="text-4xl font-semibold">Image-sharing from the final frontier</h3>
<p className="text-sm opacity-70">
    Powered by NASA Official API
</p>
</div>
<div className="mb-44">
<SearchForm />
</div>

<div className="absolute -bottom-6 text-center block w-full py-6 ">
Made by Abhay Gupta
</div>
</article>
)
}

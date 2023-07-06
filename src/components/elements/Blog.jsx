import Image from "next/image";
import Link from "next/link";
import {imageLoader, shimmer, toBase64} from "../../lib/utils";

const Blog = ({post: {title, date, thumb, description,}}) => {
    return (
        <article className="blog card p-4 md:p-5">
            <div className="blog-top relative mb-4">
                <Link href='#' scroll={false}>
                    <a className="fiximage hover-scale block" title={title}>
                        <Image
                            loader={imageLoader}
                            unoptimized={true}
                            src={thumb}
                            height={240}
                            width={400}
                            alt="Blog Image"
                            layout="responsive"
                            objectFit="cover"
                            placeholder="blur"
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(
                                shimmer(400, 240)
                            )}`}
                        />
                    </a>
                </Link>

                <div
                    className="blog-date absolute left-auto right-5 top-5 inline-block min-h-[60px] min-w-[60px] rounded bg-primary p-2 text-center text-grey"
                    style={{display: 'grid', alignItems: 'center'}}
                >
                <span className="date block text-2xl leading-none">
                    {date}
                </span>
                </div>
            </div>

            <h5 className="mb-0">
                <Link href='#' scroll={false}>
                    <a
                        className=" block overflow-hidden overflow-ellipsis whitespace-nowrap transition-colors duration-500 hover:text-primary"
                        title={title}
                    >
                        {title}
                    </a>
                </Link>
            </h5>

            <div className="portfolio-content mt-4">
                <p>{description}</p>
            </div>
        </article>
    );
};

export default Blog;

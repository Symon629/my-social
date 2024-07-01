import Link from "next/link";
import PostShow from "@/components/posts/post-show";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import { paths } from "@/path";
import { fetchCommentsByPostId } from "@/db/queries/comments";
import { Suspense } from "react";
import PostShowLoading from "@/components/posts/post-show-loading";



interface PostShowPageProps {
  params: {
    slug: string;
    postid: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postid } = params;
  console.log("Post Show page",params)

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {"< "}Back to {slug}
      </Link>
      <Suspense fallback={<PostShowLoading/>}>
      <PostShow postId={postid}/>
      </Suspense>
      <CommentCreateForm postId={postid} startOpen />
      <CommentList fetchData={()=>fetchCommentsByPostId(postid)} />
    </div>
  );
}
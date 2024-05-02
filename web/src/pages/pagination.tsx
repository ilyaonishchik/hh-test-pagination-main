import { useRouter } from "next/router";
import { Pagination as BootstrapPagination } from "react-bootstrap";

export default function Pagination({ count }: { count: number }) {
  const router = useRouter();
  const page = parseInt(router.query.page as string) || 1;
  const take = parseInt(router.query.take as string) || 20;

  const getPaginationItems = (page: number) => {
    const startPage = Math.floor((page - 1) / 10) * 10;
    const items = [];
    for (let i = startPage + 1; i <= startPage + 10; i++) {
      if (i <= count / take)
        items.push(
          <BootstrapPagination.Item key={i} active={i === page} onClick={() => router.push(`/?page=${i}&take=${take}`)}>
            {i}
          </BootstrapPagination.Item>
        );
    }
    return items;
  };

  return (
    <BootstrapPagination>
      <BootstrapPagination.First onClick={() => router.push(`/?page=1&take=${take}`)} />
      <BootstrapPagination.Prev onClick={() => router.push(`/?page=${page - 1}&take=${take}`)} disabled={page === 1} />
      {getPaginationItems(page)}
      <BootstrapPagination.Next
        onClick={() => router.push(`/?page=${page + 1}&take=${take}`)}
        disabled={page === count / take}
      />
      <BootstrapPagination.Last onClick={() => router.push(`/?page=${Math.floor(count / take)}&take=${take}`)} />
    </BootstrapPagination>
  );
}

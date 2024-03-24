interface Params {
    params: {
        id: string;
    }
}

const SchoolDetailPage: React.FC<Params> = ({ params: { id } }) => {
  return (
    <>School Detail: {id}</>
  );
};

export default SchoolDetailPage;
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


interface Params {
  params: {
    id: string;
  }
}

const SchoolDetailPage: React.FC<Params> = ({ params: { id } }) => {
  return (
    <Card className="h-full">
      <CardHeader>学校</CardHeader>
      <CardContent>
        School Detail: {id}
      </CardContent>
    </Card>
  );
};

export default SchoolDetailPage;
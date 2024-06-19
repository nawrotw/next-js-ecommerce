import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  subtitle: string;
  body: string;
}

export const DashboardCard = ({ title, subtitle, body }: DashboardCardProps) => {

  return <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{subtitle}</CardDescription>
    </CardHeader>
    <CardContent>
      <p>
        {body}
      </p>
    </CardContent>
  </Card>
}

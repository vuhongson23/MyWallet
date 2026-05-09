import Card from "@/src/components/ui/card";
import CategoryCardItem from "@/src/components/ui/category-card-item";

export default function RecentTransactionList() {
  return (
    <Card title="Giao dịch gần đây" isViewMore>
      {Array(4)
        .fill(0)
        .map((_, index: number) => (
          <CategoryCardItem
            key={index}
            title={`Giao dịch ${index + 1}`}
            categoryType="food"
            categoryName="Ăn uống"
            time="Hôm nay"
            amount="24.000.000"
            type="income"
          />
        ))}
    </Card>
  );
}

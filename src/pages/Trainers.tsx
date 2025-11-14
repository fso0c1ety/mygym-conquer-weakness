import BottomNav from "@/components/BottomNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const trainers = [
  {
    id: 1,
    name: "Emma Johnson",
    specialty: "Strength & Conditioning",
    rating: 4.9,
    price: 40,
    experience: "8 years",
    availability: "Mon-Fri",
    image: "/trainers/emma.jpg"
  },
  {
    id: 2,
    name: "Liam Smith",
    specialty: "Cardio & HIIT",
    rating: 4.8,
    price: 35,
    experience: "6 years",
    availability: "Mon-Sat",
    image: "/trainers/liam.jpg"
  },
  {
    id: 3,
    name: "Sophia Lee",
    specialty: "Yoga & Flexibility",
    rating: 4.9,
    price: 38,
    experience: "10 years",
    availability: "Tue-Sun",
    image: "/trainers/sophia.jpg"
  }
];

const Trainers = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="px-6 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-foreground">Fitness Trainers</h1>
        <p className="text-muted-foreground mt-1">Find your perfect training partner</p>
      </header>

      {/* Trainers List */}
      <div className="px-6">
        <div className="space-y-4">
          {trainers.map((trainer) => (
            <Card key={trainer.id} className="p-4">
              <div className="flex gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={trainer.image} />
                  <AvatarFallback>{trainer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{trainer.name}</h3>
                      <p className="text-muted-foreground text-sm">{trainer.specialty}</p>
                    </div>
                    <Badge variant="secondary">${trainer.price}/hr</Badge>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <span>⭐ {trainer.rating}</span>
                    <span>•</span>
                    <span>{trainer.experience}</span>
                  </div>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">{trainer.availability}</Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Trainers;
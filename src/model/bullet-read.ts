export interface BulletRead {
  id: number;
  name: string;
  description?: string;
  cx: number;
  cy: number;
  radarId: number;
  userId: number;
}

// id Int @id @default(autoincrement())
// name String
// description String?
// cx Int
// cy Int
// radar Radar? @relation(fields: [radarId], references: [id])
// radarId Int?
// user User? @relation(fields: [userId], references: [id])
// userId Int?

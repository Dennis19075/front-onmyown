export interface Income {
    id: string;
    createdAt: string;
    editedAt: string;
    description: string;
    enable: boolean,
    category: string;
    expense: number;
    exchange: string;
    userId: string;
}

// [BsonElement("created_at")]
// public DateTime createdAt { get; set; }

// [BsonElement("edited_at")]
// public DateTime editedAt { get; set; }

// [BsonElement("description")]
// public string description { get; set; }

// [BsonElement("responsable")]
// public string responsable { get; set; }

// [BsonElement("category")]
// public string category { get; set; }

// [BsonElement("expense")]
// public double expense { get; set; }

// [BsonElement("userId")]
// [BsonRepresentation(BsonType.ObjectId)]
// public string userId { get; set; }
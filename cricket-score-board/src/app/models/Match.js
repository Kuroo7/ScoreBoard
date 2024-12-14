import mongoose from 'mongoose';

// Match Schema
const matchSchema = new mongoose.Schema(
  {
    team1: {
      type: String,
      required: true,
    },
    team2: {
      type: String,
      required: true,
    },
    team1Score: {
      type: Number,
      default: 0,
    },
    team2Score: {
      type: Number,
      default: 0,
    },
    currentBatsman: {
      type: String,  // Name of the batsman
      // required: true,
      default:""
    },
    currentBowler: {
      type: String,  // Name of the bowler
      // required: true,
      default:""
    },
    batsmanStats: [
      {
        batsmanName: { type: String },
        runs: { type: Number, default: 0 },
        balls: { type: Number, default: 0 },
        isOut: { type: Boolean, default: false },
      },
    ],
    bowlerStats: [
      {
        bowlerName: { type: String },
        overs: { type: Number, default: 0 },
        runsConceded: { type: Number, default: 0 },
        wickets: { type: Number, default: 0 },
      },
    ],
    commentary: [String],  // Store ball-by-ball commentary
  },
  { timestamps: true }
);

const Match = mongoose.models.Match || mongoose.model('Match', matchSchema);

export default Match;

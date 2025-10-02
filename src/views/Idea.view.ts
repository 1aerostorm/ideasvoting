
export default function ideaView(idea: any) {
	const obj = {
		id: idea.id,
		header: idea.header,
		desc: idea.desc,
		votes: idea.votes,
		my_vote: idea.IdeaVotes?.length ? 1 : 0,
	};
	return obj;
};

import Database from '@db/db';

export default async function initIdeas(db: Database) {
	await db.Idea.findOrCreate({
		where: {
			id: 1,
		},
		defaults: {
			header: 'Построить много новых домов',
			desc: 'А то старые надоели. Ну и что, что они качественнее',
		}
	});
	await db.Idea.findOrCreate({
		where: {
			id: 2,
		},
		defaults: {
			header: 'Наклепать танчиков',
			desc: '',
		}
	});
	await db.Idea.findOrCreate({
		where: {
			id: 3,
		},
		defaults: {
			header: 'TypeScript - в каждую ракету',
			desc: 'А в роботах разминирования пусть будет Python - они же ползают',
		}
	});
	await db.Idea.findOrCreate({
		where: {
			id: 4,
		},
		defaults: {
			header: 'Микроконтроллеры с JavaScript вместо машинного кода',
			desc: '',
		}
	});
	await db.Idea.findOrCreate({
		where: {
			id: 5,
		},
		defaults: {
			header: 'Ландшафт воинских частей - по гайдлайнам Material Design',
			desc: '',
		}
	});
	await db.Idea.findOrCreate({
		where: {
			id: 6,
		},
		defaults: {
			header: 'А эта идея просто для того, чтобы нам протестить лимит. #1',
			desc: '',
		}
	});
	await db.Idea.findOrCreate({
		where: {
			id: 7,
		},
		defaults: {
			header: 'А эта идея просто для того, чтобы нам протестить лимит. #1',
			desc: '',
		}
	});
	await db.Idea.findOrCreate({
		where: {
			id: 8,
		},
		defaults: {
			header: 'А эта идея просто для того, чтобы нам протестить лимит. #1',
			desc: '',
		}
	});
	await db.Idea.findOrCreate({
		where: {
			id: 9,
		},
		defaults: {
			header: 'А эта идея просто для того, чтобы нам протестить лимит. #1',
			desc: '',
		}
	});
	await db.Idea.findOrCreate({
		where: {
			id: 10,
		},
		defaults: {
			header: 'А эта идея просто для того, чтобы нам протестить лимит. #1',
			desc: '',
		}
	});
	await db.Idea.findOrCreate({
		where: {
			id: 11,
		},
		defaults: {
			header: 'А эта идея просто для того, чтобы нам протестить лимит. #1',
			desc: '',
		}
	});
}

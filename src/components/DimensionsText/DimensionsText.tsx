type DimensionsProps = {
	dimensions: string | undefined;
};

type DimensionPartProps = {
	part: {
		title: string;
		value: string;
	};
	isLast: boolean;
};

const parseDimensions = (dimensions: string | undefined) => {
	if (!dimensions) return [];
	return dimensions.split(';').map((part) => {
		const [title, value] = part.split(':');
		return { title: title?.trim(), value: value?.trim() };
	});
};

const DimensionPart = ({ part, isLast }: DimensionPartProps) => (
	<>
		{part.value ? (
			<>
				<span className="primary">{part.title}:</span> {part.value}
				{!isLast && '; '}
			</>
		) : (
			<>{part.title}</>
		)}
	</>
);

const DimensionsText = ({ dimensions }: DimensionsProps) => {
	const parts = parseDimensions(dimensions);
	return (
		<p className="text">
			<span className="primary">Dimensions: </span>
			{parts.map((part, index) => (
				<DimensionPart
					key={index}
					part={part}
					isLast={index === parts.length - 1}
				/>
			))}
		</p>
	);
};

export default DimensionsText;

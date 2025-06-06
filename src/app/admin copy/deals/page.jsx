"use client";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

const deals = [
	{ id: 1, name: "Project Telecom", sector: "Telecom", ticket: "₹1Cr - ₹5Cr", status: "Open" },
	{ id: 2, name: "Project Banking", sector: "Finance", ticket: "₹50L - ₹2Cr", status: "Draft" },
];

export default function DealsPage() {
	const router = useRouter();

	return (
		<div className="min-h-[calc(100vh-8rem)] p-6 bg-white rounded-xl shadow-sm mt-5">
			{/* Header Section */}
			<div className="flex justify-between items-center mb-8">
				<div>
					<h1 className="text-2xl font-semibold text-gray-800 mb-1">Deals Management</h1>
					<p className="text-sm text-gray-500">Manage and track all your investment deals</p>
				</div>
				<button
					className="create-secondary-button "
					onClick={() => router.push("/admin/deals/create-deal")}
				>
					<span className="text-lg ">+</span>
					<span className="poppins-font  ml-2">Create New Deal</span>
				</button>
			</div>

			{/* Table Section */}
			<div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="bg-gray-50 border-b border-gray-200">
								<th className="px-6 py-4 text-left text-sm font-medium text-gray-600 tracking-wider">Title</th>
								<th className="px-6 py-4 text-left text-sm font-medium text-gray-600 tracking-wider">Sector</th>
								<th className="px-6 py-4 text-left text-sm font-medium text-gray-600 tracking-wider">Status</th>
								<th className="px-6 py-4 text-left text-sm font-medium text-gray-600 tracking-wider">Ticket Range</th>
								<th className="px-6 py-4 text-left text-sm font-medium text-gray-600 tracking-wider">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{deals.map((deal) => (
								<tr key={deal.id} className="hover:bg-gray-50 transition-colors duration-150">
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm font-medium text-gray-900">{deal.name}</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-gray-600">{deal.sector}</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span className={`px-3 py-1 text-xs font-medium rounded-full ${
											deal.status === "Open" 
												? "bg-green-100 text-green-800" 
												: "bg-yellow-100 text-yellow-800"
										}`}>
											{deal.status}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-gray-600">{deal.ticket}</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center gap-3">
											<button 
												className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
												title="Edit Deal"
											>
												<FaRegEdit className="w-4 h-4" />
											</button>
											<button 
												className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
												title="Delete Deal"
											>
												<FaTrashAlt className="w-4 h-4" />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

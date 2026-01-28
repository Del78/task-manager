<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SubTask;
use Illuminate\Http\Request;

class SubTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(SubTask::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'task_id' => 'required|integer|exists:tasks,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|string|in:pending,in_progress,completed',
        ]);

        $subTask = SubTask::create($validated);
        return response()->json($subTask, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $subTask = SubTask::findOrFail($id);
        return response()->json($subTask, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $subTask = SubTask::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|string|in:pending,in_progress,completed',
        ]);

        $subTask->update($validated);
        return response()->json($subTask, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $subTask = SubTask::findOrFail($id);
        $subTask->delete();
        return response()->json(['message' => 'SubTask deleted successfully'], 200);
    }
}

// Code generated by @apexlang/codegen. DO NOT EDIT.

package like

import (
	"context"
	"encoding/binary"

	"github.com/google/uuid"
	"github.com/nanobus/iota/go/invoke"
	"github.com/nanobus/iota/go/msgpack"
	"github.com/nanobus/iota/go/payload"
	"github.com/nanobus/iota/go/proxy"
	"github.com/nanobus/iota/go/rx/flux"
	"github.com/nanobus/iota/go/rx/mono"
	"github.com/nanobus/iota/go/transform"
)

var (
	gCaller invoke.Caller
)

func Initialize(caller invoke.Caller) {
	gCaller = caller
}

type LikeStoreImpl struct {
	opLike        uint32
	opUnlike      uint32
	opLoad        uint32
	opDelete      uint32
	opGetMultiple uint32
	opGetLikedBy  uint32
}

func NewLikeStore() *LikeStoreImpl {
	return &LikeStoreImpl{
		opLike:        invoke.ImportRequestResponse("nanochat.io.like.v1.LikeStore", "like"),
		opUnlike:      invoke.ImportRequestResponse("nanochat.io.like.v1.LikeStore", "unlike"),
		opLoad:        invoke.ImportRequestResponse("nanochat.io.like.v1.LikeStore", "load"),
		opDelete:      invoke.ImportRequestResponse("nanochat.io.like.v1.LikeStore", "delete"),
		opGetMultiple: invoke.ImportRequestStream("nanochat.io.like.v1.LikeStore", "getMultiple"),
		opGetLikedBy:  invoke.ImportRequestStream("nanochat.io.like.v1.LikeStore", "getLikedBy"),
	}
}

func (l *LikeStoreImpl) Like(ctx context.Context, likableID uuid.UUID) mono.Void {
	request := LikeStoreLikeArgs{
		LikableID: likableID,
	}
	payloadData, err := msgpack.ToBytes(&request)
	if err != nil {
		return mono.Error[struct{}](err)
	}
	var metadata [8]byte
	stream, ok := proxy.FromContext(ctx)
	binary.BigEndian.PutUint32(metadata[0:4], l.opLike)
	if ok {
		binary.BigEndian.PutUint32(metadata[4:8], stream.StreamID())
	}
	pl := payload.New(payloadData, metadata[:])
	future := gCaller.RequestResponse(ctx, pl)
	return mono.Map(future, transform.Void.Decode)
}

func (l *LikeStoreImpl) Unlike(ctx context.Context, likableID uuid.UUID) mono.Void {
	request := LikeStoreUnlikeArgs{
		LikableID: likableID,
	}
	payloadData, err := msgpack.ToBytes(&request)
	if err != nil {
		return mono.Error[struct{}](err)
	}
	var metadata [8]byte
	stream, ok := proxy.FromContext(ctx)
	binary.BigEndian.PutUint32(metadata[0:4], l.opUnlike)
	if ok {
		binary.BigEndian.PutUint32(metadata[4:8], stream.StreamID())
	}
	pl := payload.New(payloadData, metadata[:])
	future := gCaller.RequestResponse(ctx, pl)
	return mono.Map(future, transform.Void.Decode)
}

func (l *LikeStoreImpl) Load(ctx context.Context, likableID uuid.UUID) mono.Mono[Likable] {
	request := LikeStoreLoadArgs{
		LikableID: likableID,
	}
	payloadData, err := msgpack.ToBytes(&request)
	if err != nil {
		return mono.Error[Likable](err)
	}
	var metadata [8]byte
	stream, ok := proxy.FromContext(ctx)
	binary.BigEndian.PutUint32(metadata[0:4], l.opLoad)
	if ok {
		binary.BigEndian.PutUint32(metadata[4:8], stream.StreamID())
	}
	pl := payload.New(payloadData, metadata[:])
	future := gCaller.RequestResponse(ctx, pl)
	return mono.Map(future, transform.MsgPackDecode[Likable])
}

func (l *LikeStoreImpl) Delete(ctx context.Context, likableID uuid.UUID) mono.Mono[Likable] {
	request := LikeStoreDeleteArgs{
		LikableID: likableID,
	}
	payloadData, err := msgpack.ToBytes(&request)
	if err != nil {
		return mono.Error[Likable](err)
	}
	var metadata [8]byte
	stream, ok := proxy.FromContext(ctx)
	binary.BigEndian.PutUint32(metadata[0:4], l.opDelete)
	if ok {
		binary.BigEndian.PutUint32(metadata[4:8], stream.StreamID())
	}
	pl := payload.New(payloadData, metadata[:])
	future := gCaller.RequestResponse(ctx, pl)
	return mono.Map(future, transform.MsgPackDecode[Likable])
}

func (l *LikeStoreImpl) GetMultiple(ctx context.Context, likableIds []uuid.UUID) flux.Flux[Likable] {
	request := LikeStoreGetMultipleArgs{
		LikableIds: likableIds,
	}
	payloadData, err := msgpack.ToBytes(&request)
	if err != nil {
		return flux.Error[Likable](err)
	}
	var metadata [8]byte
	stream, ok := proxy.FromContext(ctx)
	binary.BigEndian.PutUint32(metadata[0:4], l.opGetMultiple)
	if ok {
		binary.BigEndian.PutUint32(metadata[4:8], stream.StreamID())
	}
	pl := payload.New(payloadData, metadata[:])
	future := gCaller.RequestStream(ctx, pl)
	return flux.Map(future, transform.MsgPackDecode[Likable])
}

func (l *LikeStoreImpl) GetLikedBy(ctx context.Context, likableID uuid.UUID, offset uint32, limit uint32) flux.Flux[LikeRef] {
	request := LikeStoreGetLikedByArgs{
		LikableID: likableID,
		Offset:    offset,
		Limit:     limit,
	}
	payloadData, err := msgpack.ToBytes(&request)
	if err != nil {
		return flux.Error[LikeRef](err)
	}
	var metadata [8]byte
	stream, ok := proxy.FromContext(ctx)
	binary.BigEndian.PutUint32(metadata[0:4], l.opGetLikedBy)
	if ok {
		binary.BigEndian.PutUint32(metadata[4:8], stream.StreamID())
	}
	pl := payload.New(payloadData, metadata[:])
	future := gCaller.RequestStream(ctx, pl)
	return flux.Map(future, transform.MsgPackDecode[LikeRef])
}
